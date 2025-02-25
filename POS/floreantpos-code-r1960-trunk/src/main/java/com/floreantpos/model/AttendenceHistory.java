/**
 * ************************************************************************
 * * The contents of this file are subject to the MRPL 1.2
 * * (the  "License"),  being   the  Mozilla   Public  License
 * * Version 1.1  with a permitted attribution clause; you may not  use this
 * * file except in compliance with the License. You  may  obtain  a copy of
 * * the License at http://www.floreantpos.org/license.html
 * * Software distributed under the License  is  distributed  on  an "AS IS"
 * * basis, WITHOUT WARRANTY OF ANY KIND, either express or implied. See the
 * * License for the specific  language  governing  rights  and  limitations
 * * under the License.
 * * The Original Code is FLOREANT POS.
 * * The Initial Developer of the Original Code is OROCUBE LLC
 * * All portions are Copyright (C) 2015 OROCUBE LLC
 * * All Rights Reserved.
 * ************************************************************************
 */
package com.floreantpos.model;

import com.floreantpos.model.base.BaseAttendenceHistory;

public class AttendenceHistory extends BaseAttendenceHistory {
	private static final long serialVersionUID = 1L;

	/*[CONSTRUCTOR MARKER BEGIN]*/
	public AttendenceHistory () {
		super();
	}

	/**
	 * Constructor for primary key
	 */
	public AttendenceHistory (java.lang.Integer id) {
		super(id);
	}

	/*[CONSTRUCTOR MARKER END]*/

//	public Boolean isClockedOut() {
//		if (Optional.ofNullable(super.isClockedOut() == null) {
//			return Boolean.FALSE;
//		}
//		return super.isClockedOut();
//	}

}