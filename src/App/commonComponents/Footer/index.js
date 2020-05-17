import React, {Component} from 'react'
import './Footer.css'

class Footer extends Component {
    render() {
        return (
            <footer className="footer footer-fixed">
                <div className="content has-text-centered">
                    <p>
                        <span>Coding Problem</span>
                        <span className="pl-10 pr-10">-</span>
                        <span>GeekTrust</span>
                        <span className="pl-10 pr-10">-</span>
                        <span>Finding Falcone!</span>
                    </p>
                </div>
            </footer>
        )
    }
}

export default Footer