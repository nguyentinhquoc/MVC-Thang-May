import { DataSource } from 'typeorm';
import { Seeder } from '@jorgebodega/typeorm-seeding';
import { Staff } from 'src/staffs/entities/staff.entity';
import { Department } from 'src/departmens/entities/departmen.entity';
import { Position } from 'src/positions/entities/position.entity';
import { Permision } from 'src/permision/entities/permision.entity';
import * as bcrypt from 'bcrypt';

export default class StaffSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    const staffRepository = dataSource.getRepository(Staff);
    
    const count = await staffRepository.count();
    if (count > 0) {
      console.log('⏭️  Staffs already seeded, skipping...');
      return;
    }

    // Lấy departments, positions, permissions
    const departments = await dataSource.getRepository(Department).find();
    const positions = await dataSource.getRepository(Position).find();
    const permissions = await dataSource.getRepository(Permision).find();

    if (departments.length === 0 || positions.length === 0) {
      console.log('⚠️  Cannot seed staffs: departments or positions not found');
      return;
    }

    // 1. Admin - Đỗ Quang Trung (có tất cả 10 quyền)
    const admin = await staffRepository.save({
      id: 1,
      full_name: 'Đỗ Quang Trung',
      email: 'admin@gmail.com',
      number_phone: '0862201006',
      password: '$2b$10$7QUzk5EJVmQFU5vX3iCtI.BPQqPuTFUSLY8qWgL.bsyYIg41bMiQS',
      address: 'Hải dương',
      avatar: 'admin.jpg',
      description: 'Thái',
      status: true,
      role_admin: true,
      department: departments[0],
      position: positions[0],
      permisions: permissions, // Gán tất cả permissions (1-10)
    });

    console.log(`✅ Created admin: ${admin.email} with ${permissions.length} permissions`);

    // 2. Nguyễn Quốc Tình
    const staff = await staffRepository.save({
      full_name: 'Nguyễn Quốc Tình',
      email: 'nguyentinh140321@gmail.com',
      number_phone: '0862201004',
      password: '$2b$10$7QUzk5EJVmQFU5vX3iCtI.BPQqPuTFUSLY8qWgL.bsyYIg41bMiQS',
      address: 'Yên Mô Ninh Bình',
      avatar: 'file-1750832792483.jpg',
      description: '',
      status: true,
      role_admin: false,
      department: departments[0],
      position: positions[1] || positions[0],
    });
    console.log(`✅ Created staff: ${staff.email}`);
  }
}
