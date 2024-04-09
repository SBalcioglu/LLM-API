import { SchemaFromBackend } from '../../schema';
import { SchemaUtils } from '../../schema/schema-utils';

export const simpleSchemaAirportRaw: SchemaFromBackend = {
  nodes: [
    {
      name: 'airports',
      attributes: [
        { name: 'city', type: 'string' },
        { name: 'country', type: 'string' },
        { name: 'lat', type: 'float' },
        { name: 'long', type: 'float' },
        { name: 'name', type: 'string' },
        { name: 'state', type: 'string' },
        { name: 'vip', type: 'bool' },
      ],
    },
  ],
  edges: [
    {
      name: 'flights',
      label: 'flights',
      from: 'airports',
      to: 'airports',
      collection: 'flights',
      attributes: [
        { name: 'ArrTime', type: 'int' },
        { name: 'ArrTimeUTC', type: 'string' },
        { name: 'Day', type: 'int' },
        { name: 'DayOfWeek', type: 'int' },
        { name: 'DepTime', type: 'int' },
        { name: 'DepTimeUTC', type: 'string' },
        { name: 'Distance', type: 'int' },
        { name: 'FlightNum', type: 'int' },
        { name: 'Month', type: 'int' },
        { name: 'TailNum', type: 'string' },
        { name: 'UniqueCarrier', type: 'string' },
        { name: 'Year', type: 'int' },
      ],
    },
  ],
};

export const simpleSchemaAirport = SchemaUtils.schemaBackend2Graphology(simpleSchemaAirportRaw);
