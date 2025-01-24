/*!
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import { Box, Heading, Link, Table } from "@chakra-ui/react";

import { useProviderServiceGetProviders } from "openapi/queries";

const embedLinks = (text: string) => {
  const urlRegex =
    /http(s)?:\/\/[\w.-]+(\.?:[\w.-]+)*([/?#][\w\-._~:/?#[\]@!$&'()*+,;=.%]*)?/gu;
  const urls = text.match(urlRegex);
  const cleanText = text.replaceAll(/\n(?:and)?/gu, ' ').split(' ');

  return cleanText.map((part) =>
    urls?.includes(part) ? (
      <Link color="fg.info" href={part} key={part} rel="noopener noreferrer" target="_blank">
        { part }
      </Link>
    ) : `${part  } `
  );
};

export const Providers = () => {
  const { data } = useProviderServiceGetProviders();

  return (
    <Box p={2}>
      <Heading>Providers</Heading>
      <Table.Root striped>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Package Name</Table.ColumnHeader>
            <Table.ColumnHeader>Version</Table.ColumnHeader>
            <Table.ColumnHeader>Description</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data?.providers.map((provider) => (
            <Table.Row key={provider.package_name}>
              <Table.Cell>
                <Link
                  aria-label={provider.package_name}
                  color="fg.info"
                  href={`https://airflow.apache.org/docs/${provider.package_name}/${provider.version}/`}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {provider.package_name}
                </Link>
              </Table.Cell>
              <Table.Cell>{provider.version}</Table.Cell>
              <Table.Cell>{embedLinks(provider.description)}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
};
