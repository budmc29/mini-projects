#!/bin/bash

# get all videos from an user and return them in json format

# return a json list with all videos of user
# TODO: create project to get api key
curl https://www.googleapis.com/youtube/v3/channels?part=contentDetails&forUsername=OneDirectionVEVO&key={YOUR_API_KEY}


