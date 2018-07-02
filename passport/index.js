const express = require('express')
const passport = require('passport')
const Strategy = require('passport-local').Strategy
const mongoose = require('mongoose')

const User = mongoose.model('users')
