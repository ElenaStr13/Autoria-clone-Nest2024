import { Injectable, NotFoundException } from '@nestjs/common';

import { AdsViewEntity } from '../../../database/entities/ads.views.entity';
import { AdvertisementEntity } from '../../../database/entities/advertisement.entity';
import { UserAccountTypeEnum } from '../../../database/entities/enums/account.enum';
import { UserRoleEnum } from '../../../database/entities/enums/role.enum';
import { IUserData } from '../../auth/models/interfaces/user-data.interface';
import { ContentType } from '../../file-storage/enums/content-type.enum';
import { FileStorageService } from '../../file-storage/services/file-storage.service';
import { AdViewRepository } from '../../repository/services/ads.view.repository';
import { AdsRepository } from '../../repository/services/advisement.repository';
import { BaseAdsReqDto } from '../models/dto/req/base-ads.req.dto';
import { AdsViewsResDto } from '../models/dto/res/ads-view.base.dto';
import { BaseAdsResDto } from '../models/dto/res/base-ads.res.dto';
import { AdsMapper } from './ads.mapper';

@Injectable()
export class AdsService {
  constructor(
    private readonly adsRepository: AdsRepository,
    private readonly fileStorageService: FileStorageService,
    private readonly adsViewRepository: AdViewRepository,
  ) {}
  public async createAds(
    dto: BaseAdsReqDto,
    userData: IUserData,
  ): Promise<BaseAdsResDto> {
    const userAds = await this.getAdsByUserId(userData.userId);

    if (
      userData.role === UserRoleEnum.SELLER &&
      userData.accountType === UserAccountTypeEnum.BASIC
    ) {
      if (userAds.length >= 1) {
        throw new Error(
          'Basic account holders can only have one active ad at a time.',
        );
      }
    }
    console.log('Saving ad with user ID:', userData.userId);
    console.log('DTO for ad:', dto);
    const ads = await this.adsRepository.save(
      this.adsRepository.create({
        ...dto,
        user: { id: userData.userId },
      }),
    );
    console.log('userData.userId:', userData.userId);
    return AdsMapper.toResponseDTO(ads);
  }

  public async updateAd(
    id: string,
    updateDto: Partial<BaseAdsReqDto>,
  ): Promise<AdvertisementEntity> {
    const ad = await this.adsRepository.findOneBy({ id });
    if (!ad) {
      throw new NotFoundException('Ad not found');
    }
    if (ad.editQuantity >= 3) {
      ad.isActive = false;
    } else {
      ad.editQuantity += 1;
    }

    for (const key in updateDto) {
      if (updateDto.hasOwnProperty(key)) {
        ad[key] = updateDto[key];
      }
    }
    await this.adsRepository.save(ad);
    return ad;
  }

  public async getAds(): Promise<AdvertisementEntity[]> {
    const ads = await this.adsRepository.find();
    await Promise.all(ads.map((ad) => this.incrementViews(ad.id)));
    return ads;
  }

  public async getAdById(id: string): Promise<AdvertisementEntity> {
    const ad = await this.adsRepository.findOne({
      where: { id },
    });
    if (!ad) {
      throw new NotFoundException('Ad not found');
    }
    await this.incrementViews(ad.id);
    return ad;
  }

  public async getAdsByUserId(userId: string): Promise<AdvertisementEntity[]> {
    const ads = await this.adsRepository.find({
      where: {
        user: { id: userId },
      },
      relations: ['user', 'model'],
    });
    await Promise.all(ads.map((ad) => this.incrementViews(ad.id)));
    return ads;
  }

  public async uploadPhotos(
    id: string,
    photos: Express.Multer.File[],
  ): Promise<void> {
    const uploadedPhotos: string[] = [];
    for (const photo of photos) {
      const photoUrl = await this.fileStorageService.uploadFile(
        photo,
        ContentType.ADS_PHOTO,
        id,
      );
      uploadedPhotos.push(photoUrl);
    }
    await this.adsRepository.update(id, { photos: uploadedPhotos });
  }

  public async deletePhoto(id: string, photoUrl: string): Promise<void> {
    const ad = await this.adsRepository.findOneBy({ id });
    if (ad && ad.photos) {
      const updatedPhotos = ad.photos.filter((photo) => photo !== photoUrl);
      await this.fileStorageService.deleteFile(photoUrl);
      await this.adsRepository.update(id, { photos: updatedPhotos });
    }
  }
  public async deleteAllPhotos(id: string): Promise<void> {
    const ad = await this.adsRepository.findOneBy({ id });
    if (ad && ad.photos) {
      for (const photoUrl of ad.photos) {
        await this.fileStorageService.deleteFile(photoUrl);
      }
      await this.adsRepository.update(id, { photos: [] });
    }
  }

  public async deleteAds(id: string): Promise<void> {
    const ads = await this.adsRepository.findOne({ where: { id } });
    if (!ads) {
      throw new NotFoundException(`Ads with ID ${id} not found`);
    }
    await this.adsRepository.remove(ads);
  }

  private async incrementViews(id: string): Promise<void> {
    const ad = await this.adsRepository.findOneBy({ id });
    if (!ad) {
      throw new NotFoundException('Ad not found');
    }

    const adView = new AdsViewEntity();
    adView.ads = ad;
    adView.viewDate = new Date();
    await this.adsViewRepository.save(adView);
  }

  public async getAdViewsStatistics(id: string): Promise<AdsViewsResDto> {
    const ad = await this.adsRepository.findOne({ where: { id } });
    if (!ad) {
      throw new NotFoundException('Ad not found');
    }

    const views = await this.adsViewRepository.find({
      where: {
        ads: { id: id },
      },
    });

    const today = new Date();
    const startOfWeek = new Date(
      today.setDate(today.getDate() - today.getDay()),
    );
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    const dailyViews = views.filter(
      (view) => view.viewDate.toDateString() === new Date().toDateString(),
    ).length;
    const weeklyViews = views.filter(
      (view) => view.viewDate >= startOfWeek,
    ).length;
    const monthlyViews = views.filter(
      (view) => view.viewDate >= startOfMonth,
    ).length;
    const totalViews = views.length;

    return {
      totalViews,
      dailyViews,
      weeklyViews,
      monthlyViews,
    };
  }
}
