import React from 'react'
import { renderIntoDocument, findRenderedDOMComponentWithTag } from 'react-dom/test-utils'
import { Button, ButtonGroup } from 'button'

class Wrapper extends React.Component {
    render() {
        return this.props.children
    }
}

describe('<Button />', () => {
    test('Default Button', () => {
        const tree = renderIntoDocument(<Button>OK</Button>)
        const a = findRenderedDOMComponentWithTag(tree, 'button')
        expect(a.classList).toContain('bugu-btn')
        expect(a.textContent).toBe('OK')
    })
    test('Custom inline style', () => {
        const tree = renderIntoDocument(
            <Wrapper>
                <Button style={{ fontSize: '20px' }} />
            </Wrapper>,
        )
        const node = findRenderedDOMComponentWithTag(tree, 'div')
        expect(node.style.fontSize).toBe('20px')
    })
    test('onClick', () => {
        let isClicked = false
        const tree = renderIntoDocument(
            <Button
                onClick={() => {
                    isClicked = true
                }}
            />,
        )
        const buttonNode = findRenderedDOMComponentWithTag(tree, 'button')
        Simulate.click(buttonNode)
        expect(isClicked).toBe(true)
    })

    test('Disabled Button', () => {
        let isClicked = false
        const tree = renderIntoDocument(
            <Button
                disabled
                onClick={() => {
                    isClicked = true
                }}
            />,
        )
        const buttonNode = findRenderedDOMComponentWithTag(tree, 'button')
        expect(buttonNode.disabled).toBe(true)
        expect(buttonNode.classList.contains('bugu-btn-disabled')).toBe(true)
        Simulate.click(buttonNode)
        expect(isClicked).toBe(false)
    })
})

describe('<ButtonGroup />', () => {
    test('Default ButtonGroup', () => {
        const tree = renderIntoDocument(
            <Wrapper>
                <ButtonGroup />
            </Wrapper>,
        )
        const node = findRenderedDOMComponentWithTag(tree, 'div')
        expect(node.classList.contains('bugu-btn-group')).toBe(true)
    })

    test('Custom ClassName', () => {
        const tree = renderIntoDocument(
            <Wrapper>
                <ButtonGroup className="custom-group" />
            </Wrapper>,
        )
        const node = findRenderedDOMComponentWithTag(tree, 'div')
        expect(node.classList.contains('custom-group')).toBe(true)
    })

    test('Custom inline style', () => {
        const tree = renderIntoDocument(
            <Wrapper>
                <ButtonGroup style={{ fontSize: '20px' }} />
            </Wrapper>,
        )
        const node = findRenderedDOMComponentWithTag(tree, 'div')
        expect(node.style.fontSize).toBe('20px')
    })
})
