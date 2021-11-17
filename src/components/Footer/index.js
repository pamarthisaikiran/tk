import {Component} from 'react'

import {BsInstagram, BsTwitter, BsPinterest} from 'react-icons/bs'

import {
  FaFacebookSquare,
  FaInstagram,
  FaTwitter,
  FaPinterestSquare,
} from 'react-icons/fa'

import './index.css'

export default function Footer() {
  return (
    <div className="footer">
      <img
        alt="website-footer-logo"
        className="logo"
        src="https://res.cloudinary.com/ddbhluguf/image/upload/v1634469329/Vector_10x_ay1xq6.png"
      />
      <h1 className="f-heading">Tasty Kitchens </h1>
      <p className="f-para">
        The only thing we are serious about is food. Contact us on
      </p>
      <div>
        <FaInstagram testid="instagram-social-icon" className="icon" />
        <FaTwitter testid="twitter-social-icon" className="icon" />
        <FaFacebookSquare testid="facebook-social-icon" className="icon" />
        <FaPinterestSquare testid="pintrest-social-icon" className="icon" />
      </div>
    </div>
  )
}
