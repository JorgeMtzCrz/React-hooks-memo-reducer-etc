import React from 'react'
import PropTypes from 'prop-types'
import {
  Modal,
  ModalBody,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Button,
  Text,
  Icon
} from '@chakra-ui/core'

export default function MyModal(props) {
  const { isOpen, onClose, title, content, type } = props
  return (
    <Modal size="xl" isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign="center" color="white" background={type === 'success' ? '#14ACB5' : '#B51D14'}>
          {title}
        </ModalHeader>

        <ModalBody textAlign="center" color="#707070" p={10}>
          <Text fontSize="xl">{content.split('.')[0]}</Text>
          <Text fontSize="xl">{content.split('.')[1]}</Text>
          <Icon name={type} size="240px" mt={10} />
        </ModalBody>

        <ModalFooter display="flex" alignItems="center" justifyContent="center">
          <Button size="lg" variantColor="bluebdd" color="white" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

MyModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['success', 'error']).isRequired
}
