#!/usr/bin/python


import sys

turnfile = '/var/dom4/savedgames/%s/turn' % sys.argv[1]
touristturnfile = '/var/dom4/savedgames/%s/touristturn' % sys.argv[1]

tf = open(turnfile,"r")
turnnum = int(tf.read(1024))
turnnum += 1

tf.close()

if(turnnum > 5):
  ttf = open(touristturnfile,"w")
  ttf.write("%d" % (turnnum - 5))
  ttf.close()

tf = open(turnfile,"w")
tf.write("%d" % turnnum)
tf.close()
