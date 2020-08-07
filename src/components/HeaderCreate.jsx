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

export default function HeaderCreate(props) {
  const {
    submit,
    cancel,
    subject,
    description,
    priority,
    tags,
    setTags,
    teams,
    modalInfo,
    visibility,
    closeModal
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
          <SimpleGrid w="60%" columns="1" spacing={[5, 5, 5, 20]}>
            <FormControl>
              <FormLabel fontSize="xl" htmlFor="subject" color="gray.500">
                SUBJECT
              </FormLabel>
              <Input
                {...subject}
                focusBorderColor="green.500"
                size="lg"
                type="text"
                id="subject"
                aria-describedby="subject-helper-text"
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
                focusBorderColor="green.500"
                size="lg"
                resize="none"
              />
            </FormControl>

            <FormControl>
              <FormLabel mb={5} fontSize="xl" htmlFor="priority" color="gray.500">
                PRIORITY
              </FormLabel>
              <RadioGroup {...priority} id="priority" aria-describedby="priority-helper-text" spacing={5} isInline>
                <Radio variantColor="greenpf" value="LOW">
                  LOW
                </Radio>
                <Radio variantColor="greenpf" value="MEDIUM">
                  MEDIUM
                </Radio>
                <Radio variantColor="greenpf" value="HIGH">
                  HIGH
                </Radio>
              </RadioGroup>
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
