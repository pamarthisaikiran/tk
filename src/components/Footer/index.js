import {Component} from 'react'

import {BsInstagram, BsTwitter, BsPinterest} from 'react-icons/bs'

import {FaFacebookSquare} from 'react-icons/fa'

import './index.css'

export default function Footer() {
  return (
    <div className="footer">
      <h1 className="f-heading">Tasty Kitchens </h1>
      <p className="f-para">
        The only thing we are serious about is food.
        <br />
        Contact us on
      </p>
      <div>
        <BsInstagram className="icon" />
        <BsTwitter className="icon" />
        <FaFacebookSquare className="icon" />
        <BsPinterest className="icon" />
      </div>
    </div>
  )
}
