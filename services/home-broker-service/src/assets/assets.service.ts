import { PrismaService } from '../prisma/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AssetsService {
  constructor(private prismaService: PrismaService) {}

  list() {
    return this.prismaService.asset.findMany();
  }

  create(data: { id: string; symbol: string; price: number }) {
    return this.prismaService.asset.create({ data });
  }
}
