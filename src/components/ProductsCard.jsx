import React, { useMemo } from 'react'
import { Box, Button, Icon, Tag, TagLabel, Stack } from '@chakra-ui/core'
import { useTable } from 'react-table'
import Clipboard from 'react-clipboard.js';
import { Link } from 'react-router-dom';

export default function ProductsCard({ data = [], deleteProduct, changeAble }) {
  const products = useMemo(() => data, [data])
  products.map((e,i) => {
  return(e.status = {available: e.available, id: e._id},
  e.update = {id:e._id})
  }
  )
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
        Header: 'STATUS',
        Cell: ({ value }) => <Button onClick={() => changeAble(value.id, value.id) } variantColor={value.available ? "green" : "red"}>{value.available ? "Enabled":"Disabled"}</Button>,
        accessor: `status`,
      },
      {
        Header: 'UPDATE',
        Cell: ({ value }) =><Link to={`/app/products/update/${value.id}`}><Icon cursor="pointer" name="update" /></Link> ,
        accessor: 'update'
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
