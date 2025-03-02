import React from 'react';
import { Card, Divider } from 'antd';
import {
  CategoryProps,
  isVisible,
  RankedTester,
  rankWith,
  uiTypeIs,
} from '@jsonforms/core';
import { JsonFormsDispatch, withJsonFormsLayoutProps } from '@jsonforms/react';

const CustomCategoryRenderer = ({ uischema, schema, path, visible, renderers }: CategoryProps) => {
  const elements = uischema.elements || [];
  const label = uischema.label || '';

  if (!visible) {
    return null;
  }

  return (
    <Card title={label} style={{ marginBottom: 16 }} headStyle={{ backgroundColor: '#f5f5f5' }}>
      <div>
        {elements.map((child, index) => (
          <React.Fragment key={index}>
            {index > 0 && <Divider style={{ margin: '12px 0' }} />}
            <JsonFormsDispatch
              renderers={renderers}
              schema={schema}
              uischema={child}
              path={path}
            />
          </React.Fragment>
        ))}
      </div>
    </Card>
  );
};

export const customCategoryTester: RankedTester = rankWith(2, uiTypeIs('Category'));

export default withJsonFormsLayoutProps(CustomCategoryRenderer);
