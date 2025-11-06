import React, { useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'


export function Model(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('./assets/models/red-panda/source/red-panda.glb')
  const { actions } = useAnimations(animations, group)
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Armature" scale={0.01}>
          <group name="defaultMaterial001">
            <skinnedMesh
              name="defaultMaterial001_1"
              geometry={nodes.defaultMaterial001_1.geometry}
              material={materials.lambert1}
              skeleton={nodes.defaultMaterial001_1.skeleton}
              morphTargetDictionary={nodes.defaultMaterial001_1.morphTargetDictionary}
              morphTargetInfluences={nodes.defaultMaterial001_1.morphTargetInfluences}
            />
            <skinnedMesh
              name="defaultMaterial001_2"
              geometry={nodes.defaultMaterial001_2.geometry}
              material={materials.Default}
              skeleton={nodes.defaultMaterial001_2.skeleton}
              morphTargetDictionary={nodes.defaultMaterial001_2.morphTargetDictionary}
              morphTargetInfluences={nodes.defaultMaterial001_2.morphTargetInfluences}
            />
          </group>
          <primitive object={nodes.Bip01} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('./assets/models/red-panda/source/red-panda.glb')