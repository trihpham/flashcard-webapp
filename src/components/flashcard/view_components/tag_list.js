import React, { Component } from 'react';
import { Icon, Label } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

const TagList = ({tags, deletable, deleteFunction}) => {

    console.log(tags);
    return (
        <div>
            {tags.map((tag, index) => {
            return (<Label>
                    {tag}
                    {deletable ? <Icon name='delete' onClick={() => {
                    deleteFunction(index)
                }} /> : null}
                </Label>);
        })}
    </div>
    );
}

export default TagList;