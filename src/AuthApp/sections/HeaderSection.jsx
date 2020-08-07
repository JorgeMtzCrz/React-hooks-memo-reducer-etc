import React, { useState } from 'react'
import useSWR from 'swr'
import useForm from '../../hooks/useForm'
import composeData from '../../utils/composeData'
import handleAsync from '../../utils/handleAsync'
import { ALL_URL, ALL_FETCHER, CREATE_HEADER, DELETE_HEADER } from '../../services/header_service'
import { Flex, Heading, Button, Input, SimpleGrid } from '@chakra-ui/core'
import HeaderCreate from '../../components/HeaderCreate'
import HeaderCard from '../../components/HeaderCard'

export default function HeaderSection() {
  const [create, setCreate] = useState(false)
  const [form, handleInput] = useForm()


  // create data
  const subject = form.subject
  const description = form.subject
  const priority = form.subject


  const { data, mutate } = useSWR(ALL_URL, ALL_FETCHER)
  const headers = data && data.headers

  const [visibility, setVisibility] = useState(false)
  const [modalInfo, setModalInfo] = useState({ title: '', content: '', type: 'success' })

  const submit = async e => {
    e.preventDefault()
    const newHeader = composeData({ subject, description, type: priority })
    const response = await handleAsync(() => CREATE_HEADER(newHeader))
    if (response.header) {
      setModalInfo({
        title: 'Header Created',
        content: 'Your header has been created successfully!',
        type: 'success'
      })
    } else {
      setModalInfo({
        title: 'ERROR',
        content:
          'UH OH! There has been an error and your header has not been created. Please check your internet connection and try again.',
        type: 'error'
      })
    }
    mutate([response.header, ...data.header], true)
    setVisibility(true)
  }

  const closeModal = () => {
    setVisibility(false)
    setCreate(false)
  }

  const deleteHeader = async id => {
    await handleAsync(() => DELETE_HEADER(id))

    mutate(
      ALL_URL,
      data.headers.filter(header => header._id !== id),
      false
    )
  }

  return (
    <Flex direction="column" align="flex-start" h="100%">
      <Heading size="lg" as="h2" color="gray.500" mb={[3, 3, 5, 10]}>
        Headers
      </Heading>
      {!create ? (
        <>
          <SimpleGrid mb={[3, 3, 5, 10]} alignSelf="flex-end" columns="1" spacing={[5, 5, 10, 10]}>
            <Button onClick={() => setCreate(true)} variantColor="bluebdd" size="lg">
              Add Entrie
            </Button>
          </SimpleGrid>
          <Heading size="md" as="h3" color="bluebdd.800" mb={[3, 3, 5, 5]}>
            Header Entries
          </Heading>
          <HeaderCard deleteHeader={deleteHeader} data={headers} />
        </>
      ) : (
        <HeaderCreate
          visibility={visibility}
          closeModal={closeModal}
          modalInfo={modalInfo}
          submit={submit}
          subject={subject}
          description={description}
          priority={priority}
          cancel={() => setCreate(false)}
        />
      )}
    </Flex>
  )
}