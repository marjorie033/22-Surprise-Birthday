import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('/cake.glb')
  return (
    <group {...props} dispose={null}>
      <group position={[0, 1.021, 0]} scale={[1, 1.83, 1]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Circle001.geometry}
          material={materials['Material.001']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Circle001_1.geometry}
          material={materials['Material.002']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Circle001_2.geometry}
          material={materials['Material.003']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Circle001_3.geometry}
          material={materials['Material.006']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Circle001_4.geometry}
          material={materials['Material.007']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Circle001_5.geometry}
          material={materials['Material.004']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Circle001_6.geometry}
          material={materials['Material.005']}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/cake.glb')