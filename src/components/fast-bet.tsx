import * as React from 'react'
import * as Moment from 'moment'
import * as Rx from 'rx'
import { observe } from './HOCs'
import { getCurrentTime } from '../helpers'
import { observeImmutable } from './HOCs/observe';

var classNames = require('classnames');

const style = require('../styles/app.scss')

enum JockeyGenderType {
  Unknown = 1,
  Male,
  Female,
}

interface IFastRunner {
    silkIndex: number,
    acceptorName: string,
    acceptorNumber: number,
    barrier: number,
    fixedOdds: number,
    toteOdds: number,
    jockey: string,
    jockeyGender: JockeyGenderType,
    isScratched: boolean,
    emergencyNumber?: number,
    silkImage: { cssurl: string, url: string, width: number},
}

interface IHeader {
    raceTime2: Date,
}

interface IFastRunners {
  Items: { [id: number]: IFastRunner }
}

export class FastBet extends React.Component<{date: Date}, {}> {
  public render() {

    const headerData = CreateDummyHeader()

    return <div>
      <div style={{position: 'fixed', top: '0px', width: '100%'}}>
        <RaceHeader header={headerData} />
      </div>

    </div>
  }
}

const RaceHeader = ({header}: {header: IHeader}) => (
    <div className='l-faux-table w100'>
        <div className='l-faux-row'>
            <div className='l-faux-cell'>
                <div className='l-faux-table w100' style={{backgroundColor: '#000', color:'#fff'}}>
                    <div className='l-faux-row fz-12' style={{paddingBottom: '4px', paddingTop: '4px'}}>
                        <div className='l-faux-cell text-left'>
                            { getRaceCountDownComponent2(header.raceTime2) }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
)

function CreateDummyHeader(): IHeader {
  const item: IHeader = {
    raceTime2: new Date(2017, 12, 19, 10, 44, 0, 0),
  }

  return item
}

function getRaceCountDownComponent(raceTime: Date) {
  let raceCountDown = <div />

  if (raceTime !== null) {
    raceCountDown = <RaceCountDown raceTime4={raceTime}/>
  }

  return raceCountDown
}

function getRaceCountDownComponent2(raceTime: Date) {
  let raceCountDown = <div />

  if (raceTime !== null) {
    raceCountDown = <RaceCountDown raceTime4={raceTime}/>
  }

  return raceCountDown
}

interface State {
  aaa: number
}
interface Props {
  raceTime4: Date
}
interface Interval {
  bbb: number
}

// const RaceCountDown = observe<number, Date>(Rx.Observable.interval(1000).startWith(0), (raceTime) => {
// const RaceCountDown = observe<number, {raceTime:Date}>(Rx.Observable.interval(1000).startWith(0), ({raceTime}) => {

const lights$ = Rx.Observable.fromArray([1,2,3]);
const timer$ =  Rx.Observable.timer(0,200);
const state$ = lights$
                .zip(timer$, (x, y) => x)
                //.map(x=> ({aaa: x}))
                .flatMap(x=>[x])
            //    .subscribe(o => console.log(o))

const interval$ = Rx.Observable
                  .interval(1000)
                  .startWith(0)
                  //.map(x=> ({bbb: x}))
                  //.flatMap(x => [x])

//const RaceCountDown = observe<Interval, Props>(interval$, ({bbb, raceTime4}) => {
//const RaceCountDown = observe<number, Props>(interval$, ({raceTime4}) => {
//const RaceCountDown = observeImmutable<number, Props>(interval$, (props) => {
//const RaceCountDown = observe<Interval, Props>(interval$, (props) => {
//props.record
//props.bbb
const RaceCountDown = observe<number, Props>(interval$, ({raceTime4}) => {

  const timeToRace = Moment.duration(Moment(raceTime4).diff(getCurrentTime()));
  //interval$.subscribe(o => console.log(o))

  return <div>
    <div>{/*bbb*/}</div>
    <span className={classNames('ml1em', style.raceTimer, getDurationColour(timeToRace) )} data-tid-countdown-colour />
    <span className={classNames('fz-14 faux-strong', style.raceTimerText)} data-tid-coutdown-time>{getDurationText(timeToRace)}</span>
  </div>
})

function getDurationColour(timeToRace: Moment.Duration) {

  if (timeToRace.minutes() < 3) {
    return style.redBG
  }
  if (timeToRace.minutes() < 10) {
    return style.orangeBG
  }
  return style.greenBG
}

function getDurationText(timeToRace: Moment.Duration) {
  const prefix = (timeToRace.asMilliseconds() < 0) ? '-' : ''
  const duration = timeToRace.abs()

  const days = (duration.days() > 0) ? duration.days() + 'd' : ''
  const hours = (duration.hours() > 0) ? duration.hours() + 'h' : ''
  const minutes = (duration.minutes() > 0) ? duration.minutes() + 'm' : ''
  const seconds = (duration.seconds() > 0) ? duration.seconds() + 's' : ''

  if (duration.days() > 0) {
    return prefix + `${days} ${hours} ${minutes} ${seconds}`.trim()
  }

  if (duration.hours() >= 1) {
    return prefix + `${hours} ${minutes} ${seconds}`.trim()
  }

  if (duration.minutes() >= 10) {
    return prefix + `${minutes} ${seconds}`.trim()
  }

  if (duration.minutes() > 0 || duration.seconds() > 0) {
    return prefix + `${minutes} ${seconds}`.trim()
  }

  return '0s'
}