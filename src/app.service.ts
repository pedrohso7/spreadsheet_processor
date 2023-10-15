import { Injectable } from '@nestjs/common';
import * as xlsx from 'xlsx';
import { Tag } from './entities/tag.entity';

@Injectable()
export class AppService {
  async handleProcessFileFromQueue(fileBuffer: string) {
    const fileDataBuffer = Buffer.from(fileBuffer, 'base64');

    const workbook = xlsx.read(fileDataBuffer, { type: 'buffer' });
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    
    const rows = [];

    for (const cell in worksheet) {
      if(cell[0] != 'A') continue;
      const cellIndex = parseInt(cell.substring(1));
      if(cellIndex < 4) continue;
      
      const row = new Tag({
        tag: worksheet['A' + cell.substring(1)].w,
        name: worksheet['B' + cell.substring(1)].w,
        status: parseInt(worksheet['C' + cell.substring(1)].w),
        source: worksheet['D' + cell.substring(1)].w,
        price: parseFloat(worksheet['E' + cell.substring(1)].w),
      });

      rows.push(row);
    }

    const extractedTags: Tag[] = rows.map(
      (row) => new Tag({
        tag: row.tag,
        name: row.name,
        status: row.status,
        source: row.source,
        price: row.price,
      }),
    );
    
    return extractedTags;
  }
}
