import { AdvertisementEntity } from '../../../database/entities/advertisement.entity';
import { BaseAdsResDto } from '../models/dto/res/base-ads.res.dto';

export class AdsMapper {
  public static toResponseDTO(data: AdvertisementEntity): BaseAdsResDto {
    return {
      id: data.id,
      title: data.title,
      description: data.description,
      price: data.price,
      currency: data.currency,
      location: data.location,
      condition: data.condition,
      year: data.year,
      mileage: data.mileage,
      isActive: data.isActive,
      editQuantity: data.editQuantity,
      modelId: data.model.id,
      photos: data.photos,
      userId: data.user.id,
      createdAt: data.created,
      updatedAt: data.updated,
    };
  }

  public static toResponseDtos(
    adsList: AdvertisementEntity[],
  ): BaseAdsResDto[] {
    return adsList.map(AdsMapper.toResponseDTO);
  }
}
