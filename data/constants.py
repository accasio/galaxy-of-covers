import os

ROOT_DIR = os.path.dirname(os.path.realpath(__file__)) + "/"
DEBUG_DIR = ROOT_DIR  + "debug/"
OUT_DIR = ROOT_DIR + "out/"

FILE_RESULTS_TEST = open(DEBUG_DIR + "test.json", "w+")
FILE_DEBUG_SEARCH = open(DEBUG_DIR + "searchdebug.txt", "w+")
FILE_SONG_SOURCE = open(OUT_DIR + "songs.csv", "r")
FILE_SONG_OUTPUT = open(OUT_DIR + "songinfo.json", "w+")
