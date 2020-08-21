import React from 'react'
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
  Radio
} from '@chakra-ui/core'
import MyModal from './MyModal'

export default function CardCreate(props) {
  const {
    submit,
    cancel,
    title,
    subtitle,
    url,
    photo,
    description,
    modalInfo,
    visibility,
    closeModal,
    handleImage
  } = props

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
                {...title}
                focusBorderColor="bluebdd.500"
                size="lg"
                type="text"
                id="title"
                aria-describedby="subject-helper-text"
              />
            </FormControl>
            <FormControl>
              <FormLabel fontSize="xl" htmlFor="subtitle" color="gray.500">
                SUBTITLE
              </FormLabel>
              <Input
                {...subtitle}
                focusBorderColor="bluebdd.500"
                size="lg"
                type="text"
                id="subtitle"
                aria-describedby="subtitle-helper-text"
              />
            </FormControl>
            <FormControl>
              <FormLabel fontSize="xl" htmlFor="url" color="gray.500">
                URL
              </FormLabel>
              <Input
                {...url}
                focusBorderColor="bluebdd.500"
                size="lg"
                type="text"
                id="url"
                aria-describedby="url-helper-text"
              />
            </FormControl>
            <FormControl>
              <FormLabel fontSize="xl" htmlFor="description" color="gray.500">
                DESCRIPTION
              </FormLabel>
              <Textarea
                {...description}
                id="description"
                aria-describedby="description-helper-text"
                focusBorderColor="bluebdd.500"
                size="lg"
                resize="none"
              />
            </FormControl>
            <FormControl>
              <FormLabel fontSize="xl" htmlFor="photo" color="gray.500">
                IMAGE
              </FormLabel>
              <Input
                {...photo}
                onChange={handleImage}
                size="md"
                type="file"
                id="photo"
              />
            </FormControl>


          </SimpleGrid>
          <ButtonGroup mt={20} spacing={16} alignSelf="flex-start">
            <Button onClick={cancel} w="124px" h="52px" variantColor="red">
              CANCEL
            </Button>
            <Button onClick={submit} type="submit" w="124px" h="52px" variantColor="bluebdd" variant="solid">
              SEND
            </Button>
          </ButtonGroup>
        </Box>
      </Box>
      <MyModal {...modalInfo} isOpen={visibility} onClose={closeModal} />
    </>
  )
}
