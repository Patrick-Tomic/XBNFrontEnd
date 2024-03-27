'use client'
import Header from '@/components/header'
import { useEffect } from 'react'
export default function Home () {
  useEffect(() => {
    document.getElementById('brandHead')?.addEventListener('mouseover', () => {
      document.querySelectorAll('#brandChild').forEach((child) => {
        child.setAttribute('style', 'display:block;')
      })
    })

    document.getElementById('categoryHead')?.addEventListener('mouseover', () => {
      document.querySelectorAll('#categoryChild').forEach((child) => {
        child.setAttribute('style', 'display:block')
      })

      document.getElementById('catUL')?.addEventListener('mouseleave', () => {
        document.querySelectorAll('#categoryChild').forEach((child) => {
        child.setAttribute('style', 'display:hidden')
        })
      })

      document.getElementById('brandUL')?.addEventListener('mouseleave', () => {
        document.querySelectorAll('#brandChild').forEach((child) => {
        child.setAttribute('style', 'display:hidden')
        })
      })
    })
  })
  return (
  <>
  <Header />
  </>
  )
}
