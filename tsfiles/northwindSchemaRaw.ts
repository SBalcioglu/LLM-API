import { SchemaUtils } from '@graphpolaris/shared/lib/schema/schema-utils';
import { SchemaFromBackend } from '../../schema';

export const northwindSchemaRaw: SchemaFromBackend = {
  nodes: [
    {
      name: 'Order',
      attributes: [
        {
          name: 'customerID',
          type: 'string',
        },
        {
          name: 'shipCity',
          type: 'string',
        },
        {
          name: 'orderID',
          type: 'string',
        },
        {
          name: 'freight',
          type: 'string',
        },
        {
          name: 'requiredDate',
          type: 'string',
        },
        {
          name: 'employeeID',
          type: 'string',
        },
        {
          name: 'shipName',
          type: 'string',
        },
        {
          name: 'shipPostalCode',
          type: 'string',
        },
        {
          name: 'orderDate',
          type: 'string',
        },
        {
          name: 'shipRegion',
          type: 'string',
        },
        {
          name: 'shipCountry',
          type: 'string',
        },
        {
          name: 'shippedDate',
          type: 'string',
        },
        {
          name: 'shipVia',
          type: 'string',
        },
        {
          name: 'shipAddress',
          type: 'string',
        },
      ],
    },
    {
      name: 'Category',
      attributes: [
        {
          name: 'categoryID',
          type: 'string',
        },
        {
          name: 'description',
          type: 'string',
        },
        {
          name: 'categoryName',
          type: 'string',
        },
        {
          name: 'picture',
          type: 'string',
        },
      ],
    },
    {
      name: 'Customer',
      attributes: [
        {
          name: 'country',
          type: 'string',
        },
        {
          name: 'address',
          type: 'string',
        },
        {
          name: 'contactTitle',
          type: 'string',
        },
        {
          name: 'city',
          type: 'string',
        },
        {
          name: 'phone',
          type: 'string',
        },
        {
          name: 'contactName',
          type: 'string',
        },
        {
          name: 'postalCode',
          type: 'string',
        },
        {
          name: 'companyName',
          type: 'string',
        },
        {
          name: 'fax',
          type: 'string',
        },
        {
          name: 'region',
          type: 'string',
        },
        {
          name: 'customerID',
          type: 'string',
        },
      ],
    },
    {
      name: 'Product',
      attributes: [
        {
          name: 'reorderLevel',
          type: 'int',
        },
        {
          name: 'unitsInStock',
          type: 'int',
        },
        {
          name: 'unitPrice',
          type: 'float',
        },
        {
          name: 'supplierID',
          type: 'string',
        },
        {
          name: 'productID',
          type: 'string',
        },
        {
          name: 'discontinued',
          type: 'bool',
        },
        {
          name: 'quantityPerUnit',
          type: 'string',
        },
        {
          name: 'categoryID',
          type: 'string',
        },
        {
          name: 'unitsOnOrder',
          type: 'int',
        },
        {
          name: 'productName',
          type: 'string',
        },
      ],
    },
    {
      name: 'Supplier',
      attributes: [
        {
          name: 'supplierID',
          type: 'string',
        },
        {
          name: 'country',
          type: 'string',
        },
        {
          name: 'address',
          type: 'string',
        },
        {
          name: 'contactTitle',
          type: 'string',
        },
        {
          name: 'city',
          type: 'string',
        },
        {
          name: 'phone',
          type: 'string',
        },
        {
          name: 'contactName',
          type: 'string',
        },
        {
          name: 'postalCode',
          type: 'string',
        },
        {
          name: 'companyName',
          type: 'string',
        },
        {
          name: 'fax',
          type: 'string',
        },
        {
          name: 'region',
          type: 'string',
        },
        {
          name: 'homePage',
          type: 'string',
        },
      ],
    },
  ],
  edges: [
    {
      name: 'ORDERS',
      label: 'ORDERS',
      collection: 'ORDERS',
      from: 'Order',
      to: 'Product',
      attributes: [
        {
          name: 'unitPrice',
          type: 'string',
        },
        {
          name: 'productID',
          type: 'string',
        },
        {
          name: 'orderID',
          type: 'string',
        },
        {
          name: 'discount',
          type: 'string',
        },
        {
          name: 'quantity',
          type: 'int',
        },
      ],
    },
    {
      name: 'PART_OF',
      label: 'PART_OF',
      collection: 'PART_OF',
      from: 'Product',
      to: 'Category',
      attributes: [],
    },
    {
      name: 'SUPPLIES',
      label: 'SUPPLIES',
      collection: 'SUPPLIES',
      from: 'Supplier',
      to: 'Product',
      attributes: [],
    },
    {
      name: 'PURCHASED',
      label: 'PURCHASED',
      collection: 'PURCHASED',
      from: 'Customer',
      to: 'Order',
      attributes: [],
    },
  ],
};

export const northWindSchema = SchemaUtils.schemaBackend2Graphology(northwindSchemaRaw);
