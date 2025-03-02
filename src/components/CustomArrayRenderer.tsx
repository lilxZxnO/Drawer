import React from 'react';
import { Button, Space, Table } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import {
  ArrayLayoutProps,
  composePaths,
  findUISchema,
  RankedTester,
  rankWith,
  uiTypeIs,
} from '@jsonforms/core';
import { JsonFormsDispatch, withJsonFormsArrayLayoutProps } from '@jsonforms/react';

const CustomArrayRenderer = ({
  data,
  path,
  schema,
  uischema,
  addItem,
  removeItems,
  renderers,
  cells,
  label,
}: ArrayLayoutProps) => {
  const handleAdd = () => {
    if (addItem) {
      addItem(path, data?.length || 0)();
    }
  };

  const handleRemove = (index: number) => {
    if (removeItems) {
      removeItems(path, [index]);
    }
  };


  if (
    !schema.items ||
    typeof schema.items !== 'object' ||
    !('properties' in schema.items)
  ) {
    return <div>Invalid schema for array renderer</div>;
  }


  const columns = Object.keys(schema.items.properties || {}).map((prop) => ({
    title: schema.items.properties[prop].title || prop,
    dataIndex: prop,
    key: prop,
    render: (_: any, record: any, index: number) => {
      const childPath = composePaths(path, `${index}`, prop);
      const childSchema = schema.items.properties[prop];

      const childUiSchema = findUISchema(
        uischema.options?.detail?.elements || [],
        schema,
        childSchema,
        childPath
      );

      return (
        <JsonFormsDispatch
          schema={childSchema}
          uischema={childUiSchema}
          path={childPath}
          renderers={renderers}
          cells={cells}
        />
      );
    },
  }));

  columns.push({
    title: 'Actions',
    key: 'actions',
    render: (_: any, __: any, index: number) => (
      <Button type="text" danger icon={<DeleteOutlined />} onClick={() => handleRemove(index)} />
    ),
  });

  
  const dataSource = data?.map((item: any, index: number) => ({
    key: index,
    ...item,
  })) || [];

  return (
    <div>
      <h3>{label}</h3>
      <Table dataSource={dataSource} columns={columns} pagination={false} size="small" bordered />
      <Space style={{ marginTop: 16 }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          Ajouter
        </Button>
      </Space>
    </div>
  );
};


export const customArrayTester: RankedTester = rankWith(3, uiTypeIs('Control'));


export default withJsonFormsArrayLayoutProps(CustomArrayRenderer);
