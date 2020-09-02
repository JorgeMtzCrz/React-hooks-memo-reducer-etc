import React, { useMemo } from 'react'
import { Box, Icon, Tag, TagLabel, Stack } from '@chakra-ui/core'
import { useTable } from 'react-table'
import Clipboard from 'react-clipboard.js';

export default function ProductsCard({ data = [], deleteProduct }) {
  const products = useMemo(() => data, [data])

  const columns = useMemo(
    () => [
      {
        Header: 'NAME',
        accessor: 'title'
      },
      {
        Header: 'CATHEGORY',
        accessor: 'cathegory'
      },
      {
        Header: 'PRICE',
        accessor: 'price',
      },
      {
        Header: 'URL',
        Cell: ({ value }) => <div>{value} <Clipboard button-title="Copy text" data-clipboard-text={value}> <Icon cursor="pointer" name="copy" /></Clipboard></div>,
        accessor: 'url'
      },
      {
        Header: 'ADDED DATE',
        Cell: ({ value }) =>
          new Intl.DateTimeFormat('en-US', { timeZone: 'America/Los_Angeles' }).format(new Date(value)),
        accessor: 'createdAt'
      },

      {
        Header: '',
        Cell: ({ value }) => <Icon cursor="pointer" name="trash" onClick={() => deleteProduct(value)} />,
        accessor: '_id'
      }
    ],
    [deleteProduct]
  )

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data: products
  })

  return (
    <Box
      p={[10, 10, 10, 20]}
      boxShadow="2xl"
      w="100%"
      boxSizing="border-box"
      borderRadius="8px"
      display="flex"
      flexDirection="column"
    >
      <Box as="table" {...getTableProps()}>
        <Box as="thead">
          {headerGroups.map(headerGroup => (
            <Box as="tr" {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <Box as="th" textAlign="left" pl={2} pb={10} fontWeight="bold" {...column.getHeaderProps()}>
                  {column.render('Header')}
                </Box>
              ))}
            </Box>
          ))}
        </Box>
        <Box as="tbody" {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row)
            return (
              <Box textTransform="uppercase" as="tr" {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <Box as="td" textAlign="left" {...cell.getCellProps()} px={2} py={3}>
                      {cell.render('Cell')}
                    </Box>
                  )
                })}
              </Box>
            )
          })}
        </Box>
      </Box>
    </Box>
  )
}
