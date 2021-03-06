/* -*- Mode: JS2; indent-tabs-mode: nil; js2-basic-offset: 4 -*- */
/* vim: set et ts=4 sw=4: */
/*
 * Copyright (c) 2015 Marcus Lundblad.
 *
 * GNOME Maps is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by the
 * Free Software Foundation; either version 2 of the License, or (at your
 * option) any later version.
 *
 * GNOME Maps is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
 * or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License
 * for more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with GNOME Maps; if not, see <http://www.gnu.org/licenses/>.
 *
 * Author: Marcus Lundblad <ml@update.uu.se>
 */

const GObject = imports.gi.GObject;
const Gtk = imports.gi.Gtk;

const OSMTypeListRow = imports.osmTypeListRow;
const SearchPopover = imports.searchPopover;

var OSMTypePopover = GObject.registerClass({
    InternalChildren: ['list'],
    Template: 'resource:///org/gnome/Maps/ui/osm-type-popover.ui',
    Signals : {
        /* signal emitted when selecting a type, indicates OSM key and value
         * and display title */
        'selected' : { param_types: [ GObject.TYPE_STRING,
                                      GObject.TYPE_STRING,
                                      GObject.TYPE_STRING ] }
    }
}, class OSMTypePopover extends SearchPopover.SearchPopover {

    _init(props) {
        super._init(props);

        this._list.connect('row-activated', (list, row) => {
            if (row)
                this.emit('selected', row.key, row.value, row.title);
        });
    }

    showMatches(matches) {
        this._list.forall((row) => row.destroy());

        matches.forEach((type) => this._addRow(type));
        this.show();
    }

    _addRow(type) {
        let row = new OSMTypeListRow.OSMTypeListRow({ type: type,
                                                      can_focus: true });
        this._list.add(row);
    }
});
