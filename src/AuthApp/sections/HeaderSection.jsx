import React, { useState, useRef } from 'react'
import useSWR from 'swr'
import composeData from '../../utils/composeData'
import handleAsync from '../../utils/handleAsync'
import { ALL_URL, ALL_FETCHER, CREATE_HEADER, UPDATE_HEADER, DELETE_HEADER } from '../../services/header_service'
import { UPLOAD_PHOTO} from '../../services/general_service'
import { Flex, Heading, Button, SimpleGrid } from '@chakra-ui/core'
import HeaderCreate from '../../components/HeaderCreate'
import HeaderCard from '../../components/HeaderCard'
import useInput from '../../hooks/useInput'

export default function HeaderSection() {
  const [create, setCreate] = useState(false)
  const [img, setImg] = useState('')
  const imgEl = useRef()

  const uploadImage = () => imgEl.current.click()

  const handleImage = async e => {
    const formData = new FormData()
    formData.append('photo', e.target.files[0])
    const response = await handleAsync(() => UPLOAD_PHOTO(formData))
    const {img} = response
    setImg(img)
  }

  // create data
  const title = useInput('')
  const subtitle = useInput('')
  const url = useInput('')
  const description = useInput('')


  const { data, mutate } = useSWR(ALL_URL, ALL_FETCHER)
  const headers = data && data.headers
  const [visibility, setVisibility] = useState(false)
  const [modalInfo, setModalInfo] = useState({ title: '', content: '', type: 'success' })

  const submit = async e => {
    e.preventDefault()
    const newHeader = composeData({ title, subtitle, description, url  })
    const response = await handleAsync(() => CREATE_HEADER({newHeader, img}))
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
    mutate([response.headers, ...data.headers], true)
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

  if(!headers) return <p>Loading</p>
  let headerFilters = headers.filter(header => header.available === true)

  const changeAble = async (id, data) =>{
    const response = await handleAsync(()=> UPDATE_HEADER(id, data))
    mutate([response.header, data.headers], true)

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
              Add Header
            </Button>
          </SimpleGrid>
          <Heading size="md" as="h3" color="bluebdd.800" mb={[3, 3, 5, 5]}>
            Header Entries
          </Heading>
          <HeaderCard changeAble={changeAble} deleteHeader={deleteHeader} data={headers} />
        </>
      ) : (
        <HeaderCreate
          visibility={visibility}
          closeModal={closeModal}
          modalInfo={modalInfo}
          submit={submit}
          title={title}
          subtitle={subtitle}
          url={url}
          img={img}
          description={description}
          handleImage={handleImage}
          cancel={() => setCreate(false)}
        />
      )}
    </Flex>
  )
}