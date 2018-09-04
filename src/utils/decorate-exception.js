import React from 'react'
import { observer, inject } from 'mobx-react'
import { Modal } from 'antd'

function decorateException(ComposedComponent) {
    @inject('appStore')
    @observer
    class Wrapped extends React.Component {
        state = {
            // 用于缓存之前的错误信息，避免在设置appStore.error = null后，弹窗的message显示为空
            message: null
        }

        render() {
            const { error } = this.props.appStore
            let showDialog

            if (error === null) {
                showDialog = false
            } else {
                showDialog = true
                this.state.message = error.message || '系统出错了，请稍候重试'
            }

            return (
                <React.Fragment>
                    <ComposedComponent {...this.props} />
                    <Modal
                        transparent
                        maskClosable={false}
                        title="错误提示"
                        visible={showDialog}
                        onOk={this.closeDialog}
                        onCancel={this.closeDialog}
                    >
                        {this.state.message}
                    </Modal>
                </React.Fragment>
            )
        }

        closeDialog = () => {
            this.props.appStore.setError(null)
        }
    }

    return Wrapped
}

export default decorateException
