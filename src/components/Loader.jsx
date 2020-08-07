import React from 'react'
import { keyframes } from '@emotion/core'
import { Flex, PseudoBox } from '@chakra-ui/core'

function Loader() {
  const foldCubeAngle = keyframes`
    0%, 10% {
      -webkit-transform: perspective(140px) rotateX(-180deg);
      transform: perspective(140px) rotateX(-180deg);
      opacity: 0; 
    } 
    25%, 75% {
      -webkit-transform: perspective(140px) rotateX(0deg);
      transform: perspective(140px) rotateX(0deg);
      opacity: 1; 
    } 
    90%, 100% {
      -webkit-transform: perspective(140px) rotateY(180deg);
      transform: perspective(140px) rotateY(180deg);
      opacity: 0; 
    } 
  `
  return (
    <Flex w="100%" h="100vh" boxSizing="border-box" align="center" justify="center">
      <PseudoBox margin="20px auto" w="40px" h="40px" position="relative" transform="rotateZ(45deg)">
        {/* 1 */}
        <PseudoBox
          _before={{
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: '#B51D14',
            animation: `${foldCubeAngle} 2.4s infinite linear both`,
            transformOrigin: '100% 100%'
          }}
          float="left"
          w="50%"
          h="50%"
          position="relative"
          transform="scale(1.1)"
        />
        {/* 2 */}
        <PseudoBox
          _before={{
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: '#B51D14',
            animation: `${foldCubeAngle} 2.4s infinite linear both`,
            animationDelay: '0.3s',
            transformOrigin: '100% 100%'
          }}
          float="left"
          w="50%"
          h="50%"
          position="relative"
          transform="scale(1.1) rotateZ(90deg)"
        />
        {/* 4 */}
        <PseudoBox
          _before={{
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: '#B51D14',
            animation: `${foldCubeAngle} 2.4s infinite linear both`,
            animationDelay: '0.9s',
            transformOrigin: '100% 100%'
          }}
          float="left"
          w="50%"
          h="50%"
          position="relative"
          transform="scale(1.1) rotateZ(270deg)"
        />
        {/* 3 */}
        <PseudoBox
          _before={{
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: '#B51D14',
            animation: `${foldCubeAngle} 2.4s infinite linear both`,
            animationDelay: '0.6s',
            transformOrigin: '100% 100%'
          }}
          float="left"
          w="50%"
          h="50%"
          position="relative"
          transform="scale(1.1) rotateZ(180deg)"
        />
      </PseudoBox>
    </Flex>
  )
}

export default Loader