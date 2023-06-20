package entity

type Investor struct {
	ID            string
	Name          string
	AssetPosition []*InvestorAssetPosition
}

func NewInvestor(id string) *Investor {
	return &Investor{
		ID:            id,
		AssetPosition: []*InvestorAssetPosition{},
	}
}

type InvestorAssetPosition struct {
	AssetID string
	Shares  int
}

func NewInvestorAssetPosition(assetID string, shares int) *InvestorAssetPosition {
	return &InvestorAssetPosition{
		AssetID: assetID,
		Shares:  shares,
	}
}

func (investor *Investor) AddAssetPosition(assetPosition *InvestorAssetPosition) {
	investor.AssetPosition = append(investor.AssetPosition, assetPosition)
}

func (investor *Investor) UpdateAssetPosition(assetID string, numberOfShares int) {
	assetPosition := investor.GetAssetPosition(assetID)

	if assetPosition == nil {
		investor.AssetPosition = append(investor.AssetPosition, NewInvestorAssetPosition(assetID, numberOfShares))
	} else {
		assetPosition.Shares += numberOfShares
	}
}

func (investor *Investor) GetAssetPosition(assetID string) *InvestorAssetPosition {
	for _, assetPosition := range investor.AssetPosition {
		if assetPosition.AssetID == assetID {
			return assetPosition
		}
	}

	return nil
}
