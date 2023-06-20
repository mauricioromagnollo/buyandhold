package entity

type OrderQueue struct {
	Orders []*Order
}

func NewOrderQueue() *OrderQueue {
	return &OrderQueue{}
}

func (orderQueue *OrderQueue) Less(i, j int) bool {
	return orderQueue.Orders[i].Price < orderQueue.Orders[j].Price
}

func (orderQueue *OrderQueue) Swap(i, j int) {
	orderQueue.Orders[i], orderQueue.Orders[j] = orderQueue.Orders[j], orderQueue.Orders[i]
}

func (orderQueue *OrderQueue) Len() int {
	return len(orderQueue.Orders)
}

func (orderQueue *OrderQueue) Push(any interface{}) {
	orderQueue.Orders = append(orderQueue.Orders, any.(*Order))
}

func (orderQueue *OrderQueue) Pop() interface{} {
	oldOrders := orderQueue.Orders
	oldNumberOfOrders := len(oldOrders)
	item := oldOrders[oldNumberOfOrders-1]
	orderQueue.Orders = oldOrders[0 : oldNumberOfOrders-1]
	return item
}
