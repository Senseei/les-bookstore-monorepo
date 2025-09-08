import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddPurposeToAddress1725767400000 implements MigrationInterface {
  name = 'AddPurposeToAddress1725767400000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'tb_addresses',
      new TableColumn({
        name: 'purpose',
        type: 'enum',
        enum: ['billing', 'delivery', 'both'],
        default: "'both'",
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('tb_addresses', 'purpose');
  }
}
