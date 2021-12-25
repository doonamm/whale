import '../styles/Home.scss';
import UserForm from '../components/UserForm';
import {connect} from 'react-redux';

function Home(props){
    const isLogin = props.isLogin;
    if(!isLogin){
        return (
            <div className="page home default">
                <UserForm/>
            </div>
        );
    }
    else{
        return (
            <div className="page home logged-in">
            </div>
        );
    }
}

const mapStateToProps = state =>{
    return{
        isLogin: state.LoginStatus
    };
};

export default connect(mapStateToProps)(Home);