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
import { ALL_FETCHER, UPDATE_PRODUCT_INFO } from '../services/products_service'
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



const baseURL = 'http://localhost:3000/product'
//const baseURL = 'https://bestdealtest.herokuapp.com/product'
//const baseURL = 'https://bestdealapp.herokuapp.com/product'

export default function ProductUpdate(props) {
  const [form, handleInput] = useForm()
  const [img, setImg] = useState('')
  const [specifications, setSpecifications] = useState([])
  const [modalInfo, setModalInfo] = useState({ title: '', content: '', type: 'success' })
  const [visibility, setVisibility] = useState(false)
  const [product, setUpdateProduct] = useState(null)
  const history = useHistory()

  useEffect(()=>{
    axios(`${baseURL}/detail/${props.match.params.id}`)
    .then(({data:{product}})=>{
      setUpdateProduct(product)
      setSpecifications(product.specifications)
      setImg(product.img)
    })

  },[])
  const product2 = {
    titleSpecification: form.titleSpecification,
    descriptionProduct: form.descriptionProduct

  }

  const closeModal = () => {
    setVisibility(false)
    history.push('/app/products')
  }

  const handleImage = async e => {
    const formData = new FormData()
    formData.append('photo', e.target.files[0])
    const response = await handleAsync(() => UPLOAD_PHOTO(formData))
    const {img} = response
    setImg(img)
  }

  const addToCart = (product2) =>{
    if (specifications.title === ''){
      console.log('The field Title is required to add spec')
    }

    else if( form.descriptionProduct === ''){
      console.log('The field description is required to add spec')
    } 
    else{
      document.getElementById("titleSpecification").value = "";
      document.getElementById("descriptionProduct").value = "";

      setSpecifications(prevState => [...prevState, product2])

    }
  }

  const data ={
    img: img,
    specifications: specifications,
    title: form.title,
    discount: form.discount,
    price: form.price,
    cathegory: form.cathegory
  }

  const submit = async e => {
    e.preventDefault()
    const response = await handleAsync(() => UPDATE_PRODUCT_INFO(props.match.params.id, data))
    if (response.product) {
      setModalInfo({
        title: 'Product Created',
        content: 'Your product has been updated successfully!',
        type: 'success'
      })
    } else {
      setModalInfo({
        title: 'ERROR',
        content:
          'UH OH! There has been an error and your product has not been updated. Please check your internet connection and try again.',
        type: 'error'
      })
    }
    setVisibility(true)
  }


  if(!product) return <Loader/>

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
                defaultValue={product.title}
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
              <FormLabel fontSize="xl" htmlFor="description" color="gray.500">
                DESCRIPTION
              </FormLabel>
              <Textarea
                defaultValue={product.description}
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
              <FormLabel fontSize="xl" htmlFor="cathegory" color="graypf.500">
                CATHEGORY
              </FormLabel>
              <Select
                aria-describedby="description-helper-text"
                color="gray.500"
                type="select"
                size="m" 
                id="cathegory"
                name="cathegory"
                defaultValue={product.cathegory}
                onChange={handleInput}
                >
                
                <option value="hdtvs">HDTV'S</option>
                <option value="accesories">ACCESORIES</option>
                <option value="computers">COMPUTERS</option>
                <option value="audio">AUDIO</option>
                <option value="smartphones">SMARTPHONES</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel fontSize="xl" htmlFor="subtitle" color="gray.500">
                PRICE
              </FormLabel>
              <Input
                focusBorderColor="bluebdd.500"
                size="m"
                type="number"
                id="price"
                name="price"
                aria-describedby="subtitle-helper-text"
                defaultValue={product.price}
                onChange={handleInput}
              />
            </FormControl>
            <FormControl>
              <FormLabel fontSize="xl" htmlFor="discount" color="gray.500">
                DISCOUNT
              </FormLabel>
              <Input
                defaultValue={product.discount}
                focusBorderColor="bluebdd.500"
                size="m"
                type="number"
                name="discount"
                id="discount"
                aria-describedby="url-helper-text"
                onChange={handleInput}
              />
            </FormControl>
            
            <FormControl>
            <FormLabel fontSize="xl" htmlFor="description" color="gray.500">
             SPECIFICATIONS
            </FormLabel>
              <table>
                <thead>
                <tr>
                  <th scope="col">Title</th>
                  <th scope="col">Description</th>
                  <th scope="col">Options</th>
                </tr>
              </thead>
                <tbody>
                {specifications.length === 0 ? 'Add Specifications' : specifications.map((el, i) => (
                  <tr key={i}>
                    <td>
                    {el.titleSpecification}
                    </td>
                    <td>
                    {el.descriptionProduct}
                    </td>
                    <td>
                    <Icon cursor="pointer" name="trash" onClick={e =>{
                      let filter = specifications.filter(e => e !== specifications[i])

                      setSpecifications(filter)
                    }
                      } />
                  </td>
                </tr>
                  )) }
                </tbody>
              </table>
              <br/>
              <label className="form-control-label" htmlFor="input-merchant">Spec Title *</label>
              <Input
                name="titleSpecification"
                placeholder="Enter a title specification"
                type="text"
                id="titleSpecification"
                size="m"
                onChange={handleInput}
              />
              <br/>
              <label className="form-control-label" htmlFor="input-merchant">Spec Description*</label>
              <Input
                name="descriptionProduct"
                size="m"
                placeholder="Enter a description of specification"
                type="text"
                id="descriptionProduct"
                onChange={handleInput}
              />
              <br/>
              <Button
                variantColor="bluebdd"
                onClick={(e) => addToCart(product2)}
              >
                Add Specification
              </Button>
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