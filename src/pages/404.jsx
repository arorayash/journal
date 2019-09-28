import React, { useEffect } from 'react'
import styled from '@emotion/styled'
import { StyledLink } from '../components/Wrappers'

const NotFoundWrapper = styled.div`
  .note {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    pointer-events: none;
    pointer-events: all;
  }
  #canvas {
    background: #f4f2ee;
    display: block;
    height: 100vh;
    width: 100vw;
  }
`

export default function NotFound() {
  useEffect(() => {
    const canvas = document.getElementById('canvas')
    const ctx = canvas.getContext('2d')

    // ctx.canvas.width  = window.innerWidth;
    // ctx.canvas.height = window.innerHeight;

    const scale = window.devicePixelRatio
    canvas.width = window.innerWidth * scale
    canvas.height = window.innerHeight * scale

    ctx.scale(scale, scale)

    ctx.font = '50px Arial'
    let lastX = -200
    let lastY = -200

    const draw = e => {
      ctx.font = '180px Sans-serif'
      ctx.strokeStyle = '#E1DBD1'
      ctx.lineWidth = 8
      ctx.strokeText('404', lastX - 150, lastY + 60)
      ctx.fillStyle = '#F4F2EE'
      ctx.fillText('404', lastX - 150, lastY + 60)
      ;[lastX, lastY] = [e.clientX, e.clientY]
    }

    const handleResize = e => {
      ctx.canvas.width = window.innerWidth
      ctx.canvas.height = window.innerHeight
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ;[lastX, lastY] = [0, 0]
    }

    canvas.addEventListener('mousemove', draw)
    window.addEventListener('resize', handleResize)
    return () => {
      canvas.removeEventListener('mousemove', draw)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <NotFoundWrapper>
      <div className="note">
        <h3>Uh oh</h3>
        <p>You seem to be caught in the vortex</p>
        <StyledLink to="/">Let's pull you back Home</StyledLink>
      </div>
      <canvas id="canvas" />
    </NotFoundWrapper>
  )
}
