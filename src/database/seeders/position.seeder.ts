import { DataSource } from 'typeorm';
import { Seeder } from '@jorgebodega/typeorm-seeding';
import { Position } from 'src/positions/entities/position.entity';

export default class PositionSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    const positionRepository = dataSource.getRepository(Position);
    
    const count = await positionRepository.count();
    if (count > 0) {
      console.log('⏭️  Positions already seeded, skipping...');
      return;
    }

    const positions = await positionRepository.save([
      { name: 'Trưởng Phòng', description: 'Quản lý phòng ban' },
      { name: 'Nhân Viên', description: 'Nhân viên thực hiện công việc' },
    ]);

    console.log(`✅ Created ${positions.length} positions`);
  }
}
