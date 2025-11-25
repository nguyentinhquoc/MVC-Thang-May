import { DataSource } from 'typeorm';
import { Seeder } from '@jorgebodega/typeorm-seeding';
import { Permision } from 'src/permision/entities/permision.entity';
export default class PermisionSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    const permisionRepository = dataSource.getRepository(Permision);
    
    const count = await permisionRepository.count();
    if (count > 0) {
      console.log('⏭️  Permissions already seeded, skipping...');
      return;
    }

    const permissions = await permisionRepository.save([
      { id: 1, code: 'VIEW_DASHBOARD', codeParent: 'ROOT', name: 'Xem trang tổng quan', description: 'Cho phép truy cập và xem trang tổng quan thống kê. (Đề xuất: Admin, Trưởng phòng kinh doanh)' },
      { id: 2, code: 'VIEW_DEPARTMENTS', codeParent: 'ROOT', name: 'Xem danh sách phòng ban', description: 'Cho phép quản lý phòng ban .(Đề xuất: Admin)' },
      { id: 12, code: 'VIEW_POSITIONS', codeParent: 'ROOT', name: 'Xem danh sách chức vụ', description: 'Cho phép quản lý chức vụ.(Đề xuất: Admin)' },
      { id: 3, code: 'MANAGE_STAFF', codeParent: 'ROOT', name: 'Quản lý nhân viên và bảng công', description: 'Cho phép quản lý nhân viên và bảng công. (Đề xuất: Admin, Trưởng phòng)' },
      { id: 4, code: 'MANAGE_WORKFLOWS', codeParent: 'ROOT', name: 'Quản lý quy trình làm việc', description: 'Cho phép quản lý các quy trình làm việc. (Đề xuất: Admin)' },
      { id: 5, code: 'MANAGE_SALES_STAFF', codeParent: 'ROOT', name: 'Quản lý nhân viên kinh doanh', description: 'Cho phép quản nhân viên kinh doanh.(Đề xuất: Admin, Trưởng phòng kinh doanh)' },
      { id: 6, code: 'MANAGE_PLANNED_PROJECTS', codeParent: 'ROOT', name: 'Quản lí danh sách dự án dự kiến', description: 'Cho phép quản lý danh sách dự án dự kiến.(Đề xuất: Admin, Trưởng phòng kinh doanh)' },
      { id: 7, code: 'MANAGE_PROJECTS', codeParent: 'ROOT', name: 'Quản lý công trình', description: 'Cho phép quản lý công trình. (Đề xuất: Admin, Nhân viên kinh doanh)' },
      { id: 8, code: 'MANAGE_MAINTENANCE', codeParent: 'ROOT', name: 'Quản lý bảo trì, bảo hành', description: 'Cho phép quản lý phần bảo trì và bảo hành. (Đề xuất: Admin, Nhân viên kinh doanh)' },
      { id: 9, code: 'VIEW_ASSIGNED_PROJECTS', codeParent: 'ROOT', name: 'Danh sách công trình phụ trách', description: 'Hiển thị danh sách các công trình mà nhân viên kinh doanh đang phụ trách (Đề xuất: Nhân viên kinh doanh)' },
      { id: 10, code: 'VIEW_PROJECT_STATISTICS', codeParent: 'ROOT', name: 'Thống kê công trình', description: 'Cho phép xem danh sách công trình bảo trì theo địa chỉ' },
      { id: 11, code: 'VIEW_MAINTENANCE_STATISTICS', codeParent: 'ROOT', name: 'Thống kê bảo trì theo tháng', description: 'Cho phép xem thống kê bảo trì theo tháng' },

    ]);
  }
}
