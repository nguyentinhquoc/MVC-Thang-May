import { DataSource } from 'typeorm';
import { Seeder } from '@jorgebodega/typeorm-seeding';
import { Department } from 'src/departmens/entities/departmen.entity';

export default class DepartmentSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    const departmentRepository = dataSource.getRepository(Department);
    
    // Kiểm tra đã có data chưa
    const count = await departmentRepository.count();
    if (count > 0) {
      console.log('⏭️  Departments already seeded, skipping...');
      return;
    }

    // Tạo 4 department cố định
    const departments = await departmentRepository.save([
      { name: 'Phòng Kinh Doanh', description: 'Bộ phận kinh doanh và chăm sóc khách hàng' },
      { name: 'Phòng Kỹ Thuật', description: 'Bộ phận kỹ thuật và lắp đặt thang máy' },
      { name: 'Phòng Kế Toán', description: 'Bộ phận kế toán và tài chính' },
    ]);

    console.log(`✅ Created ${departments.length} departments`);
  }
}
