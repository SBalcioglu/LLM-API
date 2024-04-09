import { SchemaFromBackend } from '../../schema';
import { SchemaUtils } from '../../schema/schema-utils';

export const simpleSchemaRaw: SchemaFromBackend = {
  nodes: [
    {
      name: 'Thijs',
      attributes: [],
    },
    {
      name: 'Airport',
      attributes: [
        { name: 'city', type: 'string' },
        { name: 'vip', type: 'bool' },
        { name: 'state', type: 'string' },
      ],
    },
    {
      name: 'Airport2',
      attributes: [
        { name: 'city', type: 'string' },
        { name: 'vip', type: 'bool' },
        { name: 'state', type: 'string' },
      ],
    },
    {
      name: 'Plane',
      attributes: [
        { name: 'type', type: 'string' },
        { name: 'maxFuelCapacity', type: 'int' },
      ],
    },
    { name: 'Staff', attributes: [] },
  ],
  edges: [
    {
      name: 'Airport2:Airport',
      label: 'Airport2:Airport',
      from: 'Airport2',
      to: 'Airport',
      collection: 'flights',
      attributes: [
        { name: 'arrivalTime', type: 'int' },
        { name: 'departureTime', type: 'int' },
      ],
    },
    {
      name: 'Airport:Staff',
      label: 'Airport:Staff',
      from: 'Airport',
      to: 'Staff',
      collection: 'flights',
      attributes: [{ name: 'salary', type: 'int' }],
    },
    {
      name: 'Plane:Airport',
      label: 'Plane:Airport',
      from: 'Plane',
      to: 'Airport',
      collection: 'flights',
      attributes: [],
    },
    {
      name: 'Airport:Thijs',
      label: 'Airport:Thijs',
      from: 'Airport',
      to: 'Thijs',
      collection: 'flights',
      attributes: [{ name: 'hallo', type: 'string' }],
    },
    {
      name: 'Thijs:Airport',
      label: 'Thijs:Airport',
      from: 'Thijs',
      to: 'Airport',
      collection: 'flights',
      attributes: [{ name: 'hallo', type: 'string' }],
    },
    {
      name: 'Staff:Plane',
      label: 'Staff:Plane',
      from: 'Staff',
      to: 'Plane',
      collection: 'flights',
      attributes: [{ name: 'hallo', type: 'string' }],
    },
    {
      name: 'Staff:Airport2',
      label: 'Staff:Airport2',
      from: 'Staff',
      to: 'Airport2',
      collection: 'flights',
      attributes: [{ name: 'hallo', type: 'string' }],
    },
    {
      name: 'Airport2:Plane',
      label: 'Airport2:Plane',
      from: 'Airport2',
      to: 'Plane',
      collection: 'flights',
      attributes: [{ name: 'hallo', type: 'string' }],
    },
    {
      name: 'Airport:Airport',
      label: 'Airport:Airport',
      from: 'Airport',
      to: 'Airport',
      collection: 'flights',
      attributes: [{ name: 'test', type: 'string' }],
    },
  ],
};

export const simpleSchema = SchemaUtils.schemaBackend2Graphology(simpleSchemaRaw);
