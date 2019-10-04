import {mapActions, mapMutations } from 'vuex'
 const PlayerMixin = {
  watch:{
    playerVolume () {
        this.changeVolume({volume: this.playerVolume})
      },
      progressPercent(){
        this.playerProgressPercent = this.progressPercent
      },
    timeLapse () {
      if (this.timeLapse) {
        this.updateTimeLapse(false)
      }
      if((this.currentTrackDuration === 'NaN : NaN') || ((this.progressPercent === 'NaN') || (this.progressPercent === 0) || !(this.progressPercent))){ // fix to displaying track time 'NaN : NaN' & timeBufferMins being stuck at 0
        this.updateCountCheck({countCheck: 0})
          this.viewShit()
        }
      },
      volume(){
          this.playerVolume = this.volume
      },
      audio () {
        // changed Track
        this.currentTrackTime = parseInt(this.audio.currentTime);
        this.lastRecordedTrackTime = -1
      }
  },
    mounted(){
      let xns = this;
      console.log(this.Songs)
      console.log(this.Songs.length)
      this.addSongs({ songs: xns.songs })
      this.updateLastSongId({lastSongId: xns.Songs.length - 1})
      this.updateContinuousPlay({ status: xns.repeatAll })
      this.playerVolume = this.getVolume
      this.playerProgressPercent = this.getProgressPercent
    },
    methods:{
      scrubChange(){
        this.scrubToTime(this.playerProgressPercent)
      },
      changeContinuousPlay(){
        this.updateContinuousPlay({status: !this.continuousPlay})
      },
      ...mapActions([
        'viewShit',
        'playSong',
        'play',
        'nextSong',
        'prevSong',
        'stop',
        'scrubToTime',
        'updateTimeLapse'
      ]),
      ...mapMutations([
        'changeVolume',
        'updateCountCheck',
        'updateAudioCurrentTime',
        'updateLastSongId',
        'changeAudioVolume',
        'updateContinuousPlay',
        'addSongs'
      ])
    }
 }

export default PlayerMixin;
