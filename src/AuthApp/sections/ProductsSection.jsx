import React, { useState, useRef } from 'react'
import useSWR from 'swr'
import composeData from '../../utils/composeData'
import handleAsync from '../../utils/handleAsync'
import { ALL_URL, ALL_FETCHER, CREATE_PRODUCT, DELETE_PRODUCT } from '../../services/products_service'
import { UPLOAD_PHOTO} from '../../services/general_service'
import { Flex, Heading, Button, SimpleGrid } from '@chakra-ui/core'
import ProductsCreate from '../../components/ProductsCreate'
import ProductsCard from '../../components/ProductsCard'
import useInput from '../../hooks/useInput'

export default function ProductsSection() {
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
  const price = useInput('')
  const cathegory = useInput('')
  const description = useInput('')
  const discount = useInput('')


  const { data, mutate } = useSWR(ALL_URL, ALL_FETCHER)
  const products = data && data.products
  const [visibility, setVisibility] = useState(false)
  const [modalInfo, setModalInfo] = useState({ title: '', content: '', type: 'success' })

  const submit = async e => {
    e.preventDefault()
    const newProduct = composeData({ title, price, description, cathegory, discount  })
    console.log(newProduct)
    const response = await handleAsync(() => CREATE_PRODUCT({newProduct, img}))
    if (response.product) {
      setModalInfo({
        title: 'Product Created',
        content: 'Your product has been created successfully!',
        type: 'success'
      })
    } else {
      setModalInfo({
        title: 'ERROR',
        content:
          'UH OH! There has been an error and your product has not been created. Please check your internet connection and try again.',
        type: 'error'
      })
    }
    mutate([response.products, ...data.products], true)
    setVisibility(true)
  }

  const closeModal = () => {
    setVisibility(false)
    setCreate(false)
  }

  const deleteProduct = async id => {
    await handleAsync(() => DELETE_PRODUCT(id))

    mutate(
      ALL_URL,
      data.products.filter(product => product._id !== id),
      false
    )
  }

  return (
    <Flex direction="column" align="flex-start" h="100%">
      <Heading size="lg" as="h2" color="gray.500" mb={[3, 3, 5, 10]}>
       Products
      </Heading>
      {!create ? (
        <>
          <SimpleGrid mb={[3, 3, 5, 10]} alignSelf="flex-end" columns="1" spacing={[5, 5, 10, 10]}>
            <Button onClick={() => setCreate(true)} variantColor="bluebdd" size="lg">
              Add Product
            </Button>
          </SimpleGrid>
          <Heading size="md" as="h3" color="bluebdd.800" mb={[3, 3, 5, 5]}>
            Products Entries
          </Heading>
          <ProductsCard deleteProduct={deleteProduct} data={products} />
        </>
      ) : (
        <ProductsCreate
          visibility={visibility}
          closeModal={closeModal}
          modalInfo={modalInfo}
          submit={submit}
          title={title}
          description={description}
          discount={discount}
          price={price}
          cathegory={cathegory}
          handleImage={handleImage}
          cancel={() => setCreate(false)}
        />
      )}
    </Flex>
  )
}