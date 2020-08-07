import React, { useMemo } from 'react'
import { Box, Icon, Tag, TagLabel, Stack } from '@chakra-ui/core'
import { useTable } from 'react-table'

export default function HeaderCard({ data = [], deleteHeader }) {
  const headers = useMemo(() => data, [data])

  const columns = useMemo(
    () => [
      {
        Header: 'Title',
        accessor: 'title'
      },
      {
        Header: 'Subtitle',
        accessor: 'subtitle'
      },
      {
        Header: 'Description',
        accessor: 'description'
      },
      {
        Header: 'Date Added',
        Cell: ({ value }) =>
          new Intl.DateTimeFormat('en-US', { timeZone: 'America/Los_Angeles' }).format(new Date(value)),
        accessor: 'createdAt'
      },

      {
        Header: '',
        Cell: ({ value }) => <Icon cursor="pointer" name="trash" onClick={() => deleteHeader(value)} />,
        accessor: '_id'
      }
    ],
    [deleteHeader]
  )

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data: headers
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
