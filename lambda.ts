import { APIGatewayProxyHandlerV2 } from 'aws-lambda';
import { Reader } from '@maxmind/geoip2-node';
import path from 'path';

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json',
};

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  const reader = await Reader.open(
    path.join(__dirname, 'GeoLite2-Country.mmdb')
  );
  const result = reader.country(event.requestContext.http.sourceIp);
  const body = {
    region: result.country!.isoCode,
  };
  return {
    headers,
    statusCode: 200,
    body: JSON.stringify(body),
  };
};
