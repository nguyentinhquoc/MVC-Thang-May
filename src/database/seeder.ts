import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

// Import entities
import { Staff } from 'src/staffs/entities/staff.entity';
import { Department } from 'src/departmens/entities/departmen.entity';
import { Position } from 'src/positions/entities/position.entity';
import { Workflow } from 'src/workflows/entities/workflow.entity';
import { Step } from 'src/steps/entities/step.entity';
import { WorkflowStep } from 'src/workflow_steps/entities/workflow_step.entity';
import { Project } from 'src/project/entities/project.entity';
import { ProjectStep } from 'src/project_steps/entities/project_step.entity';
import { ProjectEdit } from 'src/project_edit/entities/project_edit.entity';
import { Notification } from 'src/notification/entities/notification.entity';
import { Maintenance } from 'src/maintenance/entities/maintenance.entity';
import { MaintenanceAction } from 'src/maintenance_actions/entities/maintenance_action.entity';
import { ProjectStaff } from 'src/project_staff/entities/project_staff.entity';
import { Customer } from 'src/customer/entities/customer.entity';
import { DepartmentsStep } from 'src/departments_steps/entities/departments_step.entity';
import { TargetBusine } from 'src/target_busines/entities/target_busine.entity';
import { Permision } from 'src/permision/entities/permision.entity';
import { HistoryMaintenance } from 'src/history-maintenance/entities/history-maintenance.entity';

// Import seeders
import DepartmentSeeder from './seeders/department.seeder';
import PositionSeeder from './seeders/position.seeder';
import PermisionSeeder from './seeders/permision.seeder';
import StaffSeeder from './seeders/staff.seeder';

// Load environment variables
config();

const configService = new ConfigService();

const options: DataSourceOptions = {
  type: 'mysql',
  host: configService.get<string>('DATABASE_HOST') || 'localhost',
  port: configService.get<number>('DATABASE_PORT') || 3306,
  username: configService.get<string>('DATABASE_USER') || 'root',
  password: configService.get<string>('DATABASE_PASS') || 'wavebear',
  database: configService.get<string>('DATABASE_NAME') || 'quan_ly_thang_may',
  entities: [
    Staff,
    Department,
    Position,
    Workflow,
    Step,
    WorkflowStep,
    Project,
    ProjectStep,
    ProjectEdit,
    Notification,
    Maintenance,
    MaintenanceAction,
    ProjectStaff,
    Customer,
    DepartmentsStep,
    TargetBusine,
    Permision,
    HistoryMaintenance,
  ],
  synchronize: false,
};

const dataSource = new DataSource(options);

dataSource
  .initialize()
  .then(async () => {
    console.log('🌱 Starting database seeding...\n');
    
    // Chạy từng seeder theo thứ tự
    const departmentSeeder = new DepartmentSeeder();
    await departmentSeeder.run(dataSource);
    
    const positionSeeder = new PositionSeeder();
    await positionSeeder.run(dataSource);
    
    const permisionSeeder = new PermisionSeeder();
    await permisionSeeder.run(dataSource);
    
    const staffSeeder = new StaffSeeder();
    await staffSeeder.run(dataSource);
    
    console.log('\n✅ Database seeding completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Error during seeding:', error);
    process.exit(1);
  });
