import React, {useEffect, useState} from 'react'
import {
  Box,
  Button,
  ButtonGroup,
  SimpleGrid,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  RadioGroup,
  Radio,
  Select,
  Icon
} from '@chakra-ui/core'
import { UPDATE_HEADER_INFO } from '../services/header_service'
import useForm from '../hooks/useForm'
import useSWR from 'swr'
import handleAsync from '../utils/handleAsync'
import { UPLOAD_PHOTO} from '../services/general_service'
import composeData from '../utils/composeData'
import useInput from '../hooks/useInput'
import Loader from './Loader'
import axios from 'axios'
import MyModal from './MyModal'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'


//const baseURL = 'http://localhost:3000/header'
//const baseURL = 'https://bestdealtest.herokuapp.com/header'
const baseURL = 'https://bestdealapp.herokuapp.com/header'

export default function HeaderUpdate(props) {
  const [form, handleInput] = useForm()
  const [img, setImg] = useState('')
  const [modalInfo, setModalInfo] = useState({ title: '', content: '', type: 'success' })
  const [visibility, setVisibility] = useState(false)
  const [header, setUpdateHeader] = useState(null)
  const history = useHistory()

  useEffect(()=>{
    axios(`${baseURL}/detail/${props.match.params.id}`)
    .then(({data:{header}})=>{
      setUpdateHeader(header)
      setImg(header.img)
    })

  },[])

  const closeModal = () => {
    setVisibility(false)
    history.push('/app/header')
  }

  const handleImage = async e => {
    const formData = new FormData()
    formData.append('photo', e.target.files[0])
    const response = await handleAsync(() => UPLOAD_PHOTO(formData))
    const {img} = response
    setImg(img)
  }


  const data ={
    img: img,
    title: form.title,
    subtitle: form.subtitle,
    url: form.url,
    description: form.description
  }

  const submit = async e => {
    e.preventDefault()
    const response = await handleAsync(() => UPDATE_HEADER_INFO(props.match.params.id, data))
    if (response.header) {
      setModalInfo({
        title: 'Header Updated',
        content: 'Your header has been updated successfully!',
        type: 'success'
      })
    } else {
      setModalInfo({
        title: 'ERROR',
        content:
          'UH OH! There has been an error and your header has not been updated. Please check your internet connection and try again.',
        type: 'error'
      })
    }
    setVisibility(true)
  }


  if(!header) return <Loader/>

  return (
    <>
      <Box
        p={[10, 10, 10, 20]}
        boxShadow="2xl"
        w="100%"
        boxSizing="border-box"
        borderRadius="8px"
        display="flex"
        flexDirection="column"
      >
        <Box as="form" onSubmit={submit} display="flex" flexDirection="column">
          <SimpleGrid w="100%" columns="2" spacing={[5, 5, 5, 20]}>
            <FormControl>
              <FormLabel fontSize="xl" htmlFor="title" color="gray.500">
                TITLE
              </FormLabel>
              <Input
                defaultValue={header.title}
                focusBorderColor="bluebdd.500"
                size="m"
                type="text"
                id="title"
                name="title"
                aria-describedby="subject-helper-text"
                onChange={handleInput}
              />
            </FormControl>
            <FormControl>
              <FormLabel fontSize="xl" htmlFor="title" color="gray.500">
                SUBTITLE
              </FormLabel>
              <Input
                defaultValue={header.subtitle}
                focusBorderColor="bluebdd.500"
                size="m"
                type="text"
                id="subtitle"
                name="subtitle"
                aria-describedby="subject-helper-text"
                onChange={handleInput}
              />
            </FormControl>
            <FormControl>
              <FormLabel fontSize="xl" htmlFor="title" color="gray.500">
                URL
              </FormLabel>
              <Input
                defaultValue={header.url}
                focusBorderColor="bluebdd.500"
                size="m"
                type="text"
                id="url"
                name="url"
                aria-describedby="subject-helper-text"
                onChange={handleInput}
              />
            </FormControl>
            <FormControl>
              <FormLabel fontSize="xl" htmlFor="description" color="gray.500">
                DESCRIPTION
              </FormLabel>
              <Textarea
                defaultValue={header.description}
                id="description"
                name="description"
                aria-describedby="description-helper-text"
                focusBorderColor="bluebdd.500"
                size="m"
                resize="none"
                onChange={handleInput}
              />
            </FormControl>

            <FormControl>
              <FormLabel fontSize="xl" htmlFor="photo" color="gray.500">
                IMAGE
              </FormLabel>
              <Input
                onChange={handleImage}
                size="m"
                type="file"
                id="photo"
                name="photo"
              />
            </FormControl>

            <FormControl>
              <FormLabel fontSize="xl" htmlFor="photo" color="gray.500">
                IMAGE PREVIEW
              </FormLabel>
              {img && <img width="500px" height="600px" src={img} alt="photo_url" />}
            </FormControl>


          </SimpleGrid>
          <ButtonGroup mt={20} spacing={16} alignSelf="flex-start">
            <Button disabled={img ? false : true} onClick={submit} type="submit" w="124px" h="52px" variantColor="bluebdd" variant="solid">
              SEND
            </Button>
          </ButtonGroup>
        </Box>
      </Box>
      <MyModal {...modalInfo} isOpen={visibility} onClose={closeModal} />
    </>
  )
}