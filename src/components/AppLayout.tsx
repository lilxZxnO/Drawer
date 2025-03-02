import React, { useState, useEffect } from 'react';
import { Layout, Menu, Typography, Drawer, Button } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { JsonForms } from '@jsonforms/react';
import { vanillaRenderers, vanillaCells } from '@jsonforms/vanilla-renderers';
import { menuItems } from '../data/menuItems';
import { formSchemas } from '../data/formSchemas';
import CustomCategoryRenderer, { customCategoryTester } from './CustomCategoryRenderer';
import { MenuItem } from '../types';

const { Header, Content, Sider } = Layout;
const { Title } = Typography;

const renderers = [
  ...vanillaRenderers,
  { tester: customCategoryTester, renderer: CustomCategoryRenderer }
];

const findFormKeyFromMenuKey = (items: MenuItem[], key: string): string | undefined => {
  for (const item of items) {
    if (item.key === key && item.formKey) {
      return item.formKey;
    }
    if (item.children) {
      const found = findFormKeyFromMenuKey(item.children, key);
      if (found) return found;
    }
  }
  return undefined;
};

const AppLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [selectedKey, setSelectedKey] = useState<string>('');
  const [formData, setFormData] = useState<any>({});
  const [currentFormKey, setCurrentFormKey] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (menuItems.length > 0 && menuItems[0].children && menuItems[0].children.length > 0) {
      const firstFormKey = menuItems[0].children[0].key;
      setSelectedKey(firstFormKey);
      
      const formKey = findFormKeyFromMenuKey(menuItems, firstFormKey);
      if (formKey && formSchemas[formKey]) {
        setCurrentFormKey(formKey);
        setFormData(formSchemas[formKey].data || {});
      }
    }
  }, []);

  const handleMenuClick = ({ key }: { key: string }) => {
    setSelectedKey(key);
    setMobileDrawerOpen(false);
    
    const formKey = findFormKeyFromMenuKey(menuItems, key);
    if (formKey && formSchemas[formKey]) {
      setCurrentFormKey(formKey);
      setFormData(formSchemas[formKey].data || {});
    }
  };

  const renderForm = () => {
    if (!currentFormKey || !formSchemas[currentFormKey]) {
      return (
        <div className="flex items-center justify-center h-full text-gray-500 text-lg">
          Sélectionnez un formulaire dans le menu
        </div>
      );
    }
  
    const { schema, uischema } = formSchemas[currentFormKey];
  
    return (
      <div className="bg-white shadow-md rounded-lg p-6">
        <JsonForms
          schema={schema}
          uischema={uischema}
          data={formData}
          renderers={renderers}
          cells={vanillaCells}
          onChange={({ data }) => setFormData(data)}
        />
      </div>
    );
  };

  const renderMenu = () => (
    <Menu
      mode="inline"
      selectedKeys={[selectedKey]}
      onClick={handleMenuClick}
      items={menuItems.map(category => ({
        key: category.key,
        label: category.label,
        children: category.children?.map(subItem => ({
          key: subItem.key,
          label: subItem.label
        }))
      }))}
      className="border-r-0"
    />
  );

  return (
    <Layout className="min-h-screen bg-gray-100">
      {}
      <Drawer
        title="Menu"
        placement="left"
        onClose={() => setMobileDrawerOpen(false)}
        open={mobileDrawerOpen}
        bodyStyle={{ padding: 0 }}
      >
        {renderMenu()}
      </Drawer>

      {}
      <Sider
        width={250}
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        breakpoint="lg"
        collapsedWidth="0"
        className="hidden lg:block bg-white shadow-md"
      >
        <div className="h-12 flex items-center justify-center text-lg font-bold border-b">Menu</div>
        {renderMenu()}
      </Sider>

      {}
      <Layout>
        <Header className="bg-white shadow-md flex items-center px-4">
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => {
              if (window.innerWidth < 992) {
                setMobileDrawerOpen(true);
              } else {
                setCollapsed(!collapsed);
              }
            }}
            className="text-lg p-2 transition-all hover:bg-gray-100"
          />
          <Title level={4} className="ml-4 mb-0 text-gray-700">
            Formulaires
          </Title>
        </Header>
        <Content className="p-6">
          {renderForm()}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
