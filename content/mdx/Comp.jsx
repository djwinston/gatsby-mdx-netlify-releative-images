import React from 'react'
import { StaticImage } from 'gatsby-plugin-image';

export const Comp = (props) => {
  console.log('PROPSCOMP', props)
  return <pre>{'=>'} {props.path}</pre>
}

export const Image = (props) => {
console.log(`TCL>>> ~ src`, props)
  return <StaticImage width={500} quality="100" src={props.src} alt="sexy" />;
}
