package main

import (
	"encoding/json"
	"fmt"
	"os"
	"sync"

	godotenv "github.com/joho/godotenv"

	ckafka "github.com/confluentinc/confluent-kafka-go/kafka"
	"github.com/mauricioromagnollo/home-broker-platform/internal/infra/kafka"
	"github.com/mauricioromagnollo/home-broker-platform/internal/market/dto"
	"github.com/mauricioromagnollo/home-broker-platform/internal/market/entity"
	"github.com/mauricioromagnollo/home-broker-platform/internal/market/transformer"
)

func getEnv(key string) string {
	return os.Getenv(key)
}

func main() {
	env := getEnv("APP_ENV")
	if env == "development" {
		godotenv.Load(".env.development")
	}

	var kafkaConfigs = struct {
		consumerTopicName string
		producerTopicName string
		host              string
		groupId           string
		offsetReset       string
	}{
		consumerTopicName: getEnv("KAFKA_CONSUMER_TOPIC_NAME"),
		producerTopicName: getEnv("KAFKA_PRODUCER_TOPIC_NAME"),
		host:              getEnv("KAFKA_HOST"),
		groupId:           getEnv("KAFKA_GROUP_ID"),
		offsetReset:       getEnv("KAFKA_OFFSET_RESET"),
	}

	ordersIn := make(chan *entity.Order)
	ordersOut := make(chan *entity.Order)
	wg := &sync.WaitGroup{}
	defer wg.Wait()

	kafkaMsgChan := make(chan *ckafka.Message)
	configMap := &ckafka.ConfigMap{
		"bootstrap.servers": kafkaConfigs.host,
		"group.id":          kafkaConfigs.groupId,
		"auto.offset.reset": kafkaConfigs.offsetReset,
	}
	producer := kafka.NewKafkaProducer(configMap)
	kafka := kafka.NewConsumer(configMap, []string{kafkaConfigs.consumerTopicName})

	go kafka.Consume(kafkaMsgChan)

	book := entity.NewBook(ordersIn, ordersOut, wg)
	go book.Trade()

	go func() {
		for msg := range kafkaMsgChan {
			wg.Add(1)
			tradeInput := dto.TradeInput{}
			err := json.Unmarshal(msg.Value, &tradeInput)
			if err != nil {
				panic(err)
			}
			order := transformer.TransformInput(tradeInput)
			ordersIn <- order
		}
	}()

	for res := range ordersOut {
		output := transformer.TransformOutput(res)
		outputJson, err := json.Marshal(output)
		fmt.Println(string(outputJson))
		if err != nil {
			panic(err)
		}
		producer.Publish(outputJson, []byte(getEnv("KAFKA_PRODUCER_KEY")), kafkaConfigs.producerTopicName)
	}
}
