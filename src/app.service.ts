import { Injectable } from '@nestjs/common';
import * as xlsx from 'xlsx';

@Injectable()
export class AppService {
  async handleProcessFileFromQueue(fileBuffer: string): Promise<void> {
    try {
      const fileData = Buffer.from(fileBuffer, 'base64');
  
      const workbook = xlsx.read(fileData, { type: 'buffer' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  
      const rows = [];
  
      for (const cell in worksheet) {
        if (!cell.startsWith('!')) {
          const cellData = worksheet[cell];
  
          if (cellData.w === 'MaisEnvios Testes') {
            continue;
          }
  
          const cellIndex = parseInt(cell.substring(1));
  
          if (cellIndex < 4) {
            continue;
          }
  
          const row = {
            tag: worksheet['A' + cell.substring(1)].w,
            name: worksheet['B' + cell.substring(1)].w,
            status: parseInt(worksheet['C' + cell.substring(1)].w),
            source: worksheet['D' + cell.substring(1)].w,
            price: parseFloat(worksheet['E' + cell.substring(1)].w),
          };
  
          rows.push(row);
        }
      }
  
      const filteredArray = rows.filter(
        (obj, index, self) => index === self.findIndex((o) => o.tag === obj.tag),
      );
  
      // await this.repository.insert(filteredArray);
    } catch (error) {
      console.log(error);
    }
  }
}
