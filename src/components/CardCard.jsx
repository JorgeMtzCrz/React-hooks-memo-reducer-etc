import React, { useMemo } from 'react'
import { Box, Icon, Button, Tag, TagLabel, Stack } from '@chakra-ui/core'
import { useTable } from 'react-table'
import {Link} from 'react-router-dom'

export default function CardCard({ data = [], deleteCard, changeAble }) {
  const cards = useMemo(() => data, [data])

  cards.map((e,i) =>{
    return(
      e.status = {available: e.available, id: e._id},
      e.update = {id:e._id}
    )
  })
 
  const columns = useMemo(
    () => [
      {
        Header: 'TITLE',
        accessor: 'title'
      },
      {
        Header: 'SUBTITLE',
        accessor: 'subtitle'
      },
      {
        Header: 'DESCRIPTION',
        accessor: 'description'
      },
      {
        Header: 'DATE ADDED',
        Cell: ({ value }) =>
          new Intl.DateTimeFormat('en-US', { timeZone: 'America/Los_Angeles' }).format(new Date(value)),
        accessor: 'createdAt'
      },
      {
        Header: 'STATUS',
        Cell: ({ value }) => <Button onClick={() => changeAble(value.id, value.id) } variantColor={value.available ? "green" : "red"}>{value.available ? "Enabled":"Disabled"}</Button>,
        accessor: `status`,
      },
      {
        Header: 'UPDATE',
        Cell: ({ value }) =><Link to={`/app/cards/update/${value.id}`}><Icon  cursor="pointer" name="update" /></Link> ,
        accessor: 'update'
      },
      {
        Header: '',
        Cell: ({ value }) => <Icon cursor="pointer" name="trash" onClick={() => deleteCard(value)} />,
        accessor: '_id'
      }
    ],
    [deleteCard, changeAble]
  )

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data: cards
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
